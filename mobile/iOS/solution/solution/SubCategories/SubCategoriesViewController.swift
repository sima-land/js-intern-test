//
//  SubCategoriesViewController.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit

class SubCategoriesViewController: UIViewController {
    @IBOutlet private weak var tableView: UITableView!
    @IBOutlet private weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet private weak var errorView: UIView!
    
    private var apiManager = APIManager()
    private let refreshControl = UIRefreshControl()
    private var subCategories: SubCategories?
    
    var category: Category?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        guard let category = self.category else {
            self.handleErrorWithText("Подкатегория не найдена") { [unowned self] in
                self.navigationController?.popViewController(animated: true)
            }
            return
        }
        self.setupNavigationBar(with: category)
        self.configureRefreshControl()
        self.getData(with: category)
    }
    
    func setupNavigationBar(with category: Category) {
        self.navigationItem.title = category.name
    }
    
    private func configureRefreshControl() {
        self.tableView.refreshControl = self.refreshControl
        self.refreshControl.addTarget(self, action: #selector(self.refresh(_:)), for: UIControl.Event.valueChanged)
    }
    
    @objc private func refresh(_ sender: UIRefreshControl) {
        guard let category = self.category else {
            return
        }
        self.getData(with: category)
    }
    
    func getData(with category: Category) {
        self.apiManager.getCategoriesData(with: category.path, type: SecondPageData.self) { [weak self] (subCategories, error) in
            guard let subCategories = subCategories else {
                self?.handleErrorWithText("Не удалось получить данные", completion: { [weak self] in
                    self?.navigationController?.popViewController(animated: true)
                })
                return
            }
            
            self?.subCategories = subCategories.items
            
            OperationQueue.main.addOperation { [weak self] in
                self?.setupErrorView(isEmpty: subCategories.items.isEmpty)
                self?.switchOffIndicators()
                self?.tableView.reloadData()
            }
        }
    }
    
    private func switchOffIndicators() {
        self.refreshControl.endRefreshing()
        self.activityIndicator.stopAnimating()
    }
    
    private func setupErrorView(isEmpty: Bool) {
        self.errorView.isHidden = !isEmpty
    }
}

extension SubCategoriesViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        guard let subCategories = self.subCategories else {
            return 0
        }
        
        return subCategories.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "SubcategoryCell", for: indexPath) as! SubcategoryTableViewCell
        cell.subCategoryModel = self.subCategories?[indexPath.row]
        return cell
    }
}

extension SubCategoriesViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    // MARK: - Removing separator of last cell in section
    func tableView(_ tableView: UITableView, viewForFooterInSection section: Int) -> UIView? {
        return UIView()
    }
    
    func tableView(_ tableView: UITableView, heightForFooterInSection section: Int) -> CGFloat {
        return 1
    }
}
