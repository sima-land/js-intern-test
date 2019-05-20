//
//  Subcategory.swift
//  sima-land
//
//  Created by Denis Kovrigin on 15/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit

struct SubcategoryData {
    var name: String?
    var count: String
}

class SubcategoryController: UITableViewController {
    
    var categoryData: CategoryData!
    
    private var subcategoriesData = [SubcategoryData]()
    
    private var titleView: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private var titleLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.boldSystemFont(ofSize: 17)
        label.textColor = UIColor(red: 0/255, green: 43/255, blue: 65/255, alpha: 1)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let title = categoryData.name {
            setupTitle(string: title)
        }
        
        if let path = categoryData.path {
            let stringUrl = "https://www.sima-land.ru/api/v3/category/?is_not_empty=1&with_adult=1&sort=priority&expand-root=1&expand=name_alias&level=2&path=" + path
            let dataService = DataService()
            dataService.getSubcategories(stringUrl: stringUrl) { subcategoriesData in
                
                self.subcategoriesData = subcategoriesData
                self.tableView.reloadData()
            }
        }
        
        tableView = UITableView(frame: self.tableView.frame, style: .grouped)
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "firsCell")
        tableView.register(SubcategoryCell.self, forCellReuseIdentifier: "secondCell")
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
         if indexPath.section == 0 {
            let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "firstCell")
            cell.accessoryType = .disclosureIndicator
            cell.textLabel!.text = categoryData.name
            cell.detailTextLabel?.attributedText = NSAttributedString(string: "Все товары", attributes: [NSAttributedString.Key.foregroundColor: UIColor(red: 110/255, green: 110/255, blue: 112/255, alpha: 1)])
            return cell
        } else {
            let subcategoryData = subcategoriesData[indexPath.row]
            let cell = tableView.dequeueReusableCell(withIdentifier: "secondCell", for: indexPath) as! SubcategoryCell
            cell.accessoryType = .disclosureIndicator
            cell.subcategoryTextLabel.text = subcategoryData.name
            cell.subcategoryNumberTextLabel.attributedText = NSAttributedString(string: subcategoryData.count, attributes: [NSAttributedString.Key.foregroundColor: UIColor(red: 110/255, green: 110/255, blue: 112/255, alpha: 1), NSAttributedString.Key.font: UIFont.systemFont(ofSize: 11)])
           return cell
        }
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 2
    }
    
    override func tableView(_ tableView: UITableView, viewForHeaderInSection section: Int) -> UIView? {
        let headerView = UIView(frame: .init())
        return headerView
    }
    
    override func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        if section == 0 {
            return 0
        }
        return 18
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 0 {
            return 1
        } else {
             return subcategoriesData.count
        }
    }
    
    private func setupTitle(string: String) {
        self.titleLabel.text = string
        
        titleView.addSubview(titleLabel)
        titleLabel.leadingAnchor.constraint(equalTo: titleView.leadingAnchor, constant: 65).isActive = true
        titleLabel.trailingAnchor.constraint(equalTo: titleView.trailingAnchor, constant: -65).isActive = true
        titleLabel.centerYAnchor.constraint(equalTo: titleView.centerYAnchor).isActive = true
        navigationItem.titleView = titleView
    }
}
