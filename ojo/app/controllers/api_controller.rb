

class ApiController < ApplicationController
  @@counter = 0
  def t1
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
    req = {
      :username=> "ruby",
      :message=>"sweet!",
      :jshide=>".t1",
      :jsshow=>".t2"
    }
    Sender.post req
    render :json=>{:status=>"ok"}
  end

  def t2
    response.headers['Access-Control-Allow-Origin'] = request.headers['Origin'] || '*'
    @@counter = @@counter + 1
    counter = @@counter

    req = {
      :username=> "ruby",
      :message=>"counter: #{counter}",
    }

    

    Sender.post req,counter
    render :json=>{:status=>"ok"}
  end

end