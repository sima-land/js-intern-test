//
//  SubcategoryTableViewCell.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit

class SubcategoryTableViewCell: UITableViewCell {
    @IBOutlet private weak var subCategoryNameLabel: UILabel!
    
    var subCategoryModel: SubCategory? {
        didSet {
            guard let subCategoryModel = self.subCategoryModel else { return }
            self.subCategoryNameLabel.text = subCategoryModel.name
        }
    }
}
