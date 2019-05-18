//
//  ClearBarNavigationController.swift
//  solution
//
//  Created by Алексей Воронов on 18/05/2019.
//  Copyright © 2019 Алексей Воронов. All rights reserved.
//

import UIKit

class ClearBarNavigationController: UINavigationController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.navigationBar.setValue(true, forKey: "hidesShadow")
    }
}
