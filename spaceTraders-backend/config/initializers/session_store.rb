if Rails.env == 'production'
  Rails.application.config.session_store :cookie_store, key: '_spaceTraders-backend', domain: 'spaceTraders-backend-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_spaceTraders-backend'
end
