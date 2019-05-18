//
//  SubCategoryDto.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import Foundation

typealias SubCategories = [SubCategory]

struct SecondPageData: Codable {
    let items: SubCategories
}

struct SubCategory: Codable {
    let name: String
}
