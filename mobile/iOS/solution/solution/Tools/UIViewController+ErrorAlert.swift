//
//  UIViewController+ErrorAlert.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit

extension UIViewController {
    // MARK: - Creating alert for showing errors
    func handleErrorWithText(_ text: String, completion: (() -> Void)? = nil) {
        let alert = UIAlertController(title: "Ошибка", message: text, preferredStyle: .alert)
        
        let cancel = UIAlertAction(title: "Ок", style: .cancel) { (_) in
            completion?()
        }
        
        alert.addAction(cancel)
        
        self.present(alert, animated: true, completion: nil)
    }
}
