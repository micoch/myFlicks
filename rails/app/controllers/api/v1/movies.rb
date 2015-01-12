module API
	module V1
		class Movies < Grape::API
			include API::V1::Defaults

			resource :movies do
				desc "Return All Movies"
				get "", root: :movies do
					Movie.all
				end

				desc "Return a Movie"
				params do
					requires :id, type: String, desc: "ID of the Movie"
				end
				get ":id", root: "movie" do
					Movie.where(id: params[:id]).first!
				end

				desc "Post to Api"
				params do
					requires :title, type: String
					requires :director, type: String
					requires :rating, type: String
				end
				post do
					Movie.create!({
						title: params[:title],
						director: params[:director],
						rating: params[:rating]
					})
				end
			end
		end
	end
end
