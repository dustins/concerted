package net.swigg.concerted

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication


@SpringBootApplication
class ConcertedApplication

fun main(args: Array<String>) {
	runApplication<ConcertedApplication>(*args)
}
