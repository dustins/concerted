package net.swigg.concerted

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.RequestMapping
import javax.servlet.http.HttpServletRequest

@Controller
class IndexController {
	@Autowired
	lateinit var mapper: ObjectMapper

	@RequestMapping(path = ["/"])
	fun index(model: Model, request: HttpServletRequest): String {
		model.set("request", mapOf(
		  "location" to request.servletPath
		))
		
		model.set("initialState", """{
			"authenticated": false	
		}""")

		return "index"
	}

	@RequestMapping(path = ["/private1", "/private2"])
	fun private(model: Model, request: HttpServletRequest): String {
		return "index/private"
	}
}