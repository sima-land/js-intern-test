//
//  Extensions.swift
//  sima-land
//
//  Created by Denis Kovrigin on 15/05/2019.
//  Copyright © 2019 Denis Kovrigin. All rights reserved.
//

import UIKit

var imageCache = [String: UIImage]()

extension UIImageView {
    
    func loadImageUsingUrlString(urlString: String) {
        image = nil
        
        if let imageFromCache = imageCache[urlString] {
            self.image = imageFromCache
            return
        }
        
        guard let url = URL(string: urlString) else { return }
        
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if let error = error {
                print("Ошибка! Не удалось загрузить изображение: ", error)
                return
            }
            
            guard let imageToCache = UIImage(data: data!) else { return }
            
            imageCache[urlString] = imageToCache
            
            DispatchQueue.main.async {
                self.image = imageToCache
            }
        }.resume()
    }
}

extension UILabel {
    func calculateLabelLines(viewWidth: CGFloat) -> Int {
        let maxSize = CGSize(width: viewWidth, height: CGFloat(Float.infinity))
        let charSize = font.lineHeight
        let text = (self.text ?? "") as NSString
        let textSize = text.boundingRect(with: maxSize, options: .usesLineFragmentOrigin, attributes: [NSAttributedString.Key.font: font!], context: nil)
        let linesRounedUp = Int(ceil(textSize.height/charSize))
        return linesRounedUp
    }
}
