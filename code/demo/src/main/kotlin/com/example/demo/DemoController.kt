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
  fun root(@RequestHeader headers: Map<String, String>, model: Model): String {
    return "Hello root"
  }

  @GetMapping("/secrets")
  fun secrets(@RequestHeader headers: Map<String, String>, model: Model): String {
    var secret1 = System.getenv("SECRET1") ?: "default_value"
    var secret2 = System.getenv("SECRET2") ?: "default_value"
    return """
    Hello Dear Secrets:
    - ${user}
    - ${password}
    """
  }

  @GetMapping("/check")
  fun internet(@RequestHeader headers: Map<String, String>, model: Model): String {
    val (request, response, result) = "https://cat-fact.herokuapp.com/facts"
    .httpGet()
    .responseString()

    when (result) {
        is Result.Failure -> {
            val ex = result.getException()
            return ex.toString()
        }
        is Result.Success -> {
            val data = result.get()
            return data
        }
    }
  }
}