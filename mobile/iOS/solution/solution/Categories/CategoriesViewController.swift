//
//  CategoriesViewController.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit

class CategoriesViewController: UIViewController {
    private var categories: Categories?
    private var apiManager = APIManager()
    private let refreshControl = UIRefreshControl()
    
    @IBOutlet private weak var collectionView: UICollectionView!
    @IBOutlet private weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet private weak var searchBar: UISearchBar!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.configureRefreshControl()
        self.getData()
        
        self.searchBar.backgroundImage = UIImage()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "OpenSubcategories" {
            let destination = segue.destination as! SubCategoriesViewController
            guard let indexPath = self.collectionView.indexPathsForSelectedItems?.first,
                let category = self.categories?[indexPath.row] else { return }
            destination.category = category
        }
    }
    
    private func configureRefreshControl() {
        self.collectionView.refreshControl = self.refreshControl
        self.refreshControl.addTarget(self, action: #selector(self.refresh(_:)), for: UIControl.Event.valueChanged)
    }
    
    @objc private func refresh(_ sender: UIRefreshControl) {
        self.getData()
    }
    
    private func getData() {
        self.apiManager.getCategoriesData(type: MainPageData.self) { [weak self] (categories, error) in
            guard let categories = categories else {
                self?.handleErrorWithText("Не удалось получить данные")
                DispatchQueue.main.async { [weak self] in
                    self?.switchOffIndicators()
                }
                return
            }
            
            self?.categories = categories.items
            
            OperationQueue.main.addOperation { [weak self] in
                self?.switchOffIndicators()
                self?.collectionView.reloadData()
            }
        }
    }
    
    private func switchOffIndicators() {
        self.refreshControl.endRefreshing()
        self.activityIndicator.stopAnimating()
    }
}

extension CategoriesViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        guard let categories = self.categories else {
            return 0
        }
        
        return categories.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CategoryCell", for: indexPath) as! CategoryCollectionViewCell
        cell.categoryModel = self.categories?[indexPath.row]
        return cell
    }
}

extension CategoriesViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        self.performSegue(withIdentifier: "OpenSubcategories", sender: self)
        collectionView.deselectItem(at: indexPath, animated: true)
    }
}

extension CategoriesViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: (self.collectionView.frame.width / 2) -  24, height: 100)
    }
}
