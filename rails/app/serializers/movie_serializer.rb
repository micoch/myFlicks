class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :director, :rating, :created_at, :updated_at
end
