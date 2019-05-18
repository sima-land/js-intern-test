//
//  CategoryCollectionViewCell.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit
import Kingfisher

class CategoryCollectionViewCell: UICollectionViewCell {
    @IBOutlet private weak var categoryNameLabel: UILabel!
    @IBOutlet private weak var categoryImageView: UIImageView!
    
    var categoryModel: Category? {
        didSet {
            guard let categoryModel = self.categoryModel else { return }
            
            self.categoryNameLabel.text = categoryModel.name
            
            self.categoryImageView.kf.indicatorType = IndicatorType.activity
            self.categoryImageView.kf.setImage(with: categoryModel.photo)
        }
    }
}
