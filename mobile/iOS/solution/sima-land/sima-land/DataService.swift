//
//  DataService.swift
//  sima-land
//
//  Created by Denis Kovrigin on 14/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit
import SwiftyJSON

class DataService {

    func getCategories(stringUrl: String, completion: @escaping ([CategoryData]) -> ()) {
        guard let url = URL(string: stringUrl) else { return }
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            
            if let error = error {
                print("Ошибка! Не удалось сделать запрос: ", error)
            }
            
            guard let data = data else { return }
            
            var categoriesData = [CategoryData]()
            
            do {
                let json = try JSON(data: data)
                let items = json["items"]
                
                for (_, item):(String, JSON) in items {
                    let name = item["name"].string
                    let imageUrl = item["photo"].string
                    let path = item["path"].string
                    categoriesData.append(CategoryData(name: name, imageUrl: imageUrl, path: path))
                }
            } catch let jsonErr {
                print("Ошибка! Не удалось спарсить json: ", jsonErr)
            }
            
            DispatchQueue.main.async {
                completion(categoriesData)
            }
            
        }.resume()
    }
    
    func getSubcategories(stringUrl: String, completion: @escaping ([SubcategoryData]) -> ()) {
        guard let url = URL(string: stringUrl) else { return }
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            
            if let error = error {
                print("Ошибка! Не удалось сделать запрос: ", error)
            }
            
            guard let data = data else { return }
            
            var subcategoriesData = [SubcategoryData]()
            
            do {
                let json = try JSON(data: data)
                let items = json["items"]
                
                for (_, item):(String, JSON) in items {
                    let name = item["name"].string
                    let count = Int.random(in: 0...100000)
                    subcategoriesData.append(SubcategoryData(name: name, count: String(count)))
                }
            } catch let jsonErr {
                print("Ошибка! Не удалось спарсить json: ", jsonErr)
            }
            
            DispatchQueue.main.async {
                completion(subcategoriesData)
            }
            
        }.resume()
    }
}
