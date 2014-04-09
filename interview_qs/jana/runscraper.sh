 #!/bin/bash cd /home/ubuntu/jana/ 
 PATH=$PATH:/usr/local/bin 
 export PATH 
 scrapy runspider -a to=dan -a env=prod scraper.py 
