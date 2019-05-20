//
//  CategoryCell.swift
//  sima-land
//
//  Created by Denis Kovrigin on 13/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit

class CategoryCell: UICollectionViewCell {
    
    var categoryData: CategoryData? {
        didSet {
            titleLabel.text = categoryData?.name
            if let imageUrl = categoryData?.imageUrl {
                imageView.loadImageUsingUrlString(urlString: imageUrl)
            }
            
            let labelLinesNumber = titleLabel.calculateLabelLines(viewWidth: self.bounds.width - 6 - 6)
            var titleViewHeightConstaint: CGFloat
            
            switch labelLinesNumber {
            case 1:
                titleViewHeightConstaint = 25
            case 2:
                titleViewHeightConstaint = 40
            default:
                titleViewHeightConstaint = 55
            }
            
            heightConstraint.constant = titleViewHeightConstaint
            heightConstraint.isActive = true
        }
    }
    
    var heightConstraint: NSLayoutConstraint!
    
    let imageView: UIImageView = {
        let iv = UIImageView()
        iv.translatesAutoresizingMaskIntoConstraints = false
        return iv
    }()
    
    let titleView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor(white: 1, alpha: 0.7)
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    let titleLabel: UILabel = {
        let label = UILabel()
        label.font = UIFont.systemFont(ofSize: 14)
        label.textAlignment = .left
        label.numberOfLines = 3
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        self.layer.cornerRadius = 5.0
        self.layer.masksToBounds = true
        
        self.addSubview(imageView)
        imageView.leadingAnchor.constraint(equalTo: self.leadingAnchor).isActive = true
        imageView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        imageView.trailingAnchor.constraint(equalTo: self.trailingAnchor).isActive = true
        imageView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        
        imageView.addSubview(titleView)
        titleView.leadingAnchor.constraint(equalTo: imageView.leadingAnchor).isActive = true
        titleView.trailingAnchor.constraint(equalTo: imageView.trailingAnchor).isActive = true
        titleView.bottomAnchor.constraint(equalTo: imageView.bottomAnchor).isActive = true
        heightConstraint = titleView.heightAnchor.constraint(equalToConstant: 0)
        
        titleView.addSubview(titleLabel)
        titleLabel.leadingAnchor.constraint(equalTo: titleView.leadingAnchor, constant: 6).isActive = true
        titleLabel.trailingAnchor.constraint(equalTo: titleView.trailingAnchor, constant: -6).isActive = true
        titleLabel.centerYAnchor.constraint(equalTo: titleView.centerYAnchor).isActive = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
