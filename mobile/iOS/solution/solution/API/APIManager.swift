//
//  APIManager.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import Foundation

class APIManager {
    private enum Errors: Error {
        case httpError
        case dataNil
        case decodingError
    }
    
    private let headers: [String: String] = [
        "Accept": "application/json",
        "Content-Type": "application/json"
    ]
    
    private let url: String = "https://www.sima-land.ru/api/v3/category/"
    
    func getCategoriesData<T: Decodable>(with path: String? = nil, type: T.Type,result: @escaping (T?, Error?) -> Void) {
        var parameters: [String: String]?
        
        if let path = path {
            parameters = ["is_not_empty": "1",
                          "with_adult": "1",
                          "sort": "priority",
                          "expand-root": "1",
                          "expand": "name-alias",
                          "level": "2",
                          "path": path]
        } else {
            parameters = ["is_not_empty": "1",
                          "with_adult": "1",
                          "sort": "priority_home",
                          "expand-root": "1",
                          "expand": "name-alias",
                          "level": "1",
                          "page": "1"]
        }
        
        let queryParameters = parameters?.compactMap({ (parameter) -> String in
            return "\(parameter.key)=\(parameter.value)"
        }).joined(separator: "&")
        
        guard let query = queryParameters,
            let  url = URL(string: self.url + "?" + query) else {
                result(nil, nil)
                return
        }
        
        let urlRequest = self.createUrlRequest(with: url)
        
        let session = URLSession.shared
        
        session.dataTask(with: urlRequest) { (data, _, error) in
            if error != nil {
                result(nil, Errors.httpError)
                return
            }
            
            guard let data = data else {
                result(nil, Errors.dataNil)
                return
            }
            
            guard let decodedData = try? JSONDecoder().decode(type, from: data) else {
                result(nil, Errors.decodingError)
                return
            }
            
            result(decodedData, nil)
            }.resume()
    }
    
    private func createUrlRequest(with url: URL) -> URLRequest {
        var request = URLRequest(url: url, cachePolicy: URLRequest.CachePolicy.returnCacheDataElseLoad, timeoutInterval: 10)
        
        for header in self.headers {
            request.setValue(header.value, forHTTPHeaderField: header.key)
        }
        
        return request
    }
}
