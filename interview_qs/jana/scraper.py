from scrapy.spider import Spider
from scrapy.selector import Selector
from scrapy.item import Item, Field
import caller

class redditSpider(Spider):
	name = "reddit"
	allowed_domains = ["reddit.com"]
	start_urls = ["http://www.reddit.com"]

	def ad(self, *args, **kw):
		self.to = kw.get('to')
		self.env = kw.get('env')
		
	def parse(self, res):
		sel = Selector(res)
		with open('twiML', 'wb') as tml:
			tml.write("<?xml version='1.0' encoding='UTF-8'?><Response>")
			tml.write("<Say voice='alice' language='en-GB'>Hey Dan! Kostco asked me to read you the reddit headline, which is<Pause length='1'/>")
			tml.write(sel.xpath("//a[@class='title ']/text()")[0].extract())
			tml.write("<Pause length='1'/> Good bye.</Say></Response>")
		return self.to