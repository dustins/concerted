package net.swigg.concerted

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
public class IndexController {
    @RequestMapping("/")
    fun index(): String {
        println("here");
        return "index"
    }
}