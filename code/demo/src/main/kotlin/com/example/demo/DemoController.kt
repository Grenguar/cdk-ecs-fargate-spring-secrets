package com.example.demo

import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.beans.factory.annotation.Value
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.result.Result;


@RestController
class DemoController {

  @GetMapping("/")
  fun root(): String {
    return "Hello root"
  }

  @GetMapping("/secrets")
  fun secrets(): String {
    var user = System.getenv("USER") ?: "default_value"
    var password = System.getenv("PASSWORD") ?: "default_value"
    return """
    Hello Dear Secrets:
    - ${user}
    - ${password}
    """
  }
  
}
