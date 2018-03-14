package net.swigg.concerted

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/settings")
@RestController
class SettingsController {
	@GetMapping("/profile")
	fun profile(): Any {
		return object {
			val displayName = "user"
			val email = "user@gmail.com"
		}
	}
}