get '/' do
    erb :index
end

get '/contacts' do
    content_type :json
    
    contacts = Contact.all
    contacts.to_json
end

get '/contacts/:id' do
    content_type :json
    
    contact = Contact.find params[:id]
    contact.to_json
end

post '/contacts' do
    # content_type :json
    
    contact = Contact.new(params[:contact])
    if contact.save
        contact.to_json
    else
        json contact.errors.full_messages
    end
end

put '/contacts/:id' do
    content_type :json
    
    contact = Contact.find(params[:id])
    if contact.update params[:contact]

    else
      json contact.errors.full_messages
    end
end


delete '/contacts' do
    content_type :json
    contact = Contact.find(params[:id])
    if contact.destroy
        contact.to_json
    else
        status 422
        json "There was a problem removing the contact."
    end
end