###

Using twitter fontana tweet walls with OAuth.io instead of built-in auth or back-end auth

Twitter Fontana: https://github.com/EightMedia/TwitterFontana
		 http://twitterfontana.com/

OAuth.io: https://github.com/oauth-io/oauthd
	  https://oauth.io/

###

$ ->
    #Check animate.css or the twitter fontana plugin page for a list of anim effects
    settings =
        transition: 'tilt-scroll'
    q = '#bestEventEver' #twitter search query
    container = $('.fontana')
    OAuthPublicKey = ''

    OAuth.initialize(OAuthPublicKey)
    OAuth.popup 'twitter', (err, res)->
        if visualizer
            visualizer.stop()
        datasource = new TwitterSearchC(q, res)
        visualizer = new Fontana.Visualizer(container, datasource)
        visualizer.start(settings)
        return

    #Set tweet wall to window height
    container.css 'height', window.innerHeight - 120

#Custom ass datasources code to allow oauth.io authentication i.e frontend auth
class TwitterSearchC
    ###
    This datasource performs a search using the Twitter API and provides
    the callback with the results. Repeated calls to getMessages will
    expand the list of messages with new search results.

    Because of API limits the minimum time between actual searches
    is 5 seconds (180 searches in a 15 minute).
    ###
    min_interval = 60000 * 15 / 180

    constructor: (@q, @res)->
        @params = {
            since_id: 1
            q: @q
            result_type: 'recent'
        }
        @lastCall = 0
        @messages = []

    getMessages: (callback)->
        now = (new Date()).getTime()
        if now - @lastCall < min_interval
            if callback
                setTimeout((=> callback(@messages)), 0)
        else
            @lastCall = (new Date()).getTime()
            @res.get(
                url: "https://api.twitter.com/1.1/search/tweets.json" 
                data: @params
                dataType: 'json')
                    .success((data)=>
                        if data.statuses.length
                            @messages = data.statuses.concat(@messages)
                            @params['since_id'] = @messages[0].id_str
                        if callback
                            if @messages.length
                                callback(@messages)
                            else
                                callback([
                                    id: (new Date()).getTime()
                                    created_at: new Date().toString()
                                    text: 'Your search term returned no Tweets :('
                                    user:
                                        name: 'Twitter Fontana'
                                        screen_name: 'twitterfontana'
                                        profile_image_url: '/img/avatar.png'
                                ])
                    )
                    .error(->
                        if callback
                            callback([
                                id: (new Date()).getTime()
                                created_at: new Date().toString()
                                text: 'Error fetching tweets :('
                                user:
                                    name: 'Twitter Fontana'
                                    screen_name: 'twitterfontana'
                                    profile_image_url: '/img/avatar.png'
                            ])
                    )

 
