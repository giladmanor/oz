require 'rest-client'
class Sender
  
  def self.post(what,counter=0)
    what.merge!({:message=>"cick one more time..."}) if counter>1
    what.merge!({:jshide=>".t2",:jsshow=>".t3",:message=>"YES"}) if counter>2
    
    RestClient.post "http://localhost:3001/post",what.to_json, :content_type => :json, :accept => :json
  end
  
  
end