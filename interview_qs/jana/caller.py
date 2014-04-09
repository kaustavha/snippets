from twilio.rest import TwilioRestClient

acc_sid = 'ACbe930b1493894647f69ac1c37d5a04f8'
auth_token = '780b46e00098205b4fa6b230ae337c8e'
client = TwilioRestClient(acc_sid, auth_token)
from_ = "+16174075240"
config = {
	'me': "+12269893852",
	'dan': "+16175130992",
	"dev": "http://44a99ae7.ngrok.com/tml",
	"prod": "http://54.213.247.191:10080/tml"
}

def Call(to, env):
	client.calls.create(
		to=config[to],
		from_=from_,
		url=config[env])