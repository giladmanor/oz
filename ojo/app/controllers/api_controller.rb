

class ApiController < ApplicationController
  
  def t1
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
    counter = 0

    req = {
      :username=> "ruby",
      :message=>"counter: #{counter}",
    }
    Sender.post req,counter
    render :json=>{:status=>"ok"}
  end

end