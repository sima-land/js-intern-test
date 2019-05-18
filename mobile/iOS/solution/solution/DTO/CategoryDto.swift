//
//  CategoryDto.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import Foundation

typealias Categories = [Category]

struct MainPageData: Codable {
    let items: Categories
}

struct Category: Codable {
    let name: String
    let path: String
    let photo: URL
}
