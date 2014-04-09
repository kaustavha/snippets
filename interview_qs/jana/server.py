from twilio.rest import TwilioRestClient
from flask import Flask
import twilio.twiml
#import mailer

# Helper method for file read
def read(filename):
	try:
		return open(filename).read()
	except Exception, e:
		return "Empty"

app = Flask(__name__)
@app.route("/", methods=['GET', 'POST'])
def quine():
	res = 'Src :~'
	for fileName in ['server.py', 'caller.py', 'scraper.py', 'twiML']:
		res += '\n ----- {0} ----- \n\n'.format(fileName)
		res += read(fileName)
	res += '\n----- End -----\n'
	open('quine', 'wb').write(res)
	return res

@app.route("/tml", methods=['GET', 'POST'])
def getTwilioML():
	return app.open_resource('twiML').read()

if __name__ == "__main__":
	app.run(debug=True, host='0.0.0.0', port=10080)
