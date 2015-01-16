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
					group :movie, type: Hash do
						requires :title, type: String
						requires :director, type: String
						requires :rating, type: String
					end
				end
				post do
					Movie.create!({
						title: params[:movie][:title],
						director: params[:movie][:director],
						rating: params[:movie][:rating]
					})
				end
				desc "Put to Api"
				params do
					requires :id, type: String
					group :movie, type: Hash do
						requires :title, type: String
						requires :director, type: String
						requires :rating, type: String
					end
				end
				put ':id' do
					Movie.find_by_id(params[:id]).update_attributes(declared(params[:movie], {include_missing: false}))
				end
			end
		end
	end
end
