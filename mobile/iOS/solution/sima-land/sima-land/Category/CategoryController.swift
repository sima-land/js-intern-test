//
//  ViewController.swift
//  sima-land
//
//  Created by Denis Kovrigin on 13/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit

struct CategoryData {
    var name: String?
    var imageUrl: String?
    var path: String?
}

class CategoryController: UIViewController, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    private var categoriesData = [CategoryData]()
    
    @IBOutlet var collectionView: UICollectionView!
    @IBOutlet var searchBar: UISearchBar!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        collectionView.delegate = self
        collectionView.dataSource = self
        
        collectionView.register(CategoryCell.self, forCellWithReuseIdentifier: "cellId")
        collectionView.contentInset = UIEdgeInsets(top: 6, left: 8, bottom: 6, right: 8)
        
        searchBar.layer.borderWidth = 2
        searchBar.layer.borderColor = UIColor(red: 233/255, green: 241/255, blue: 244/255, alpha: 1).cgColor
        
        let dataService = DataService()
        dataService.getCategories(stringUrl: "https://www.sima-land.ru/api/v3/category/?is_not_empty=1&with_adult=1&page=1&level=1&sort=priority_home&expand-root=1&expand=name_alias") { categoriesData in
            
            self.categoriesData = categoriesData
            self.collectionView.reloadData()
        }
        
//        let searchController = UISearchController(searchResultsController: nil)
//        searchController.searchBar.placeholder = "Поиск товаров"
//        searchController.searchBar.backgroundColor = UIColor(red: 233/255, green: 241/255, blue: 244/255, alpha: 1)
//        
//        navigationItem.searchController = searchController
//        navigationItem.hidesSearchBarWhenScrolling = false
    }
    
   func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cellId", for: indexPath) as! CategoryCell
        cell.categoryData = categoriesData[indexPath.row]
        return cell
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let indexPath = collectionView.indexPathsForSelectedItems {
            let dataIndex = indexPath[0][1]
            let subcategoryController = segue.destination as! SubcategoryController
            subcategoryController.categoryData = categoriesData[dataIndex]
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        performSegue(withIdentifier: "subcategorySegue", sender: nil)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return categoriesData.count
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
        return 8
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
        return 8
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let frameWidth = view.frame.width
        let width = (frameWidth - 8 - 8 - 8) / 2
        return CGSize(width: width, height: width / 1.5)
    }
}
