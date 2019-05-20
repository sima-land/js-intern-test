//
//  SubcategoryCell.swift
//  sima-land
//
//  Created by Denis Kovrigin on 16/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit

class SubcategoryCell: UITableViewCell {
    
    var subcategoryTextLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.font = UIFont.systemFont(ofSize: 17)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    var subcategoryNumberTextLabel: UILabel = {
        let label = UILabel()
        label.textAlignment = .right
        label.lineBreakMode = .byWordWrapping
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        addSubview(subcategoryNumberTextLabel)
        subcategoryNumberTextLabel.centerYAnchor.constraint(equalTo: self.centerYAnchor, constant: -1).isActive = true
        subcategoryNumberTextLabel.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -33).isActive = true
        subcategoryNumberTextLabel.widthAnchor.constraint(equalToConstant: 48).isActive = true
        
        addSubview(subcategoryTextLabel)
        subcategoryTextLabel.topAnchor.constraint(equalTo: self.topAnchor, constant: 10).isActive = true
        subcategoryTextLabel.centerYAnchor.constraint(equalTo: subcategoryNumberTextLabel.centerYAnchor).isActive = true
        subcategoryTextLabel.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 18).isActive = true
        subcategoryTextLabel.trailingAnchor.constraint(equalTo: subcategoryNumberTextLabel.leadingAnchor).isActive = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
