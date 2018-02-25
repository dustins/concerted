package net.swigg.concerted

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
class IndexController {
	@RequestMapping("/")
	fun index(): String {
		return "index"
	}
}