json.array!(@forms) do |form|
  json.extract! form, :id, :title, :fields, :view
  json.url form_url(form, format: :json)
end
