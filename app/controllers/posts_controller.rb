class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts.as_json(methods: :image_url)
  end

  # GET /posts/1
  def show
    render json: @post.as_json(methods: :image_url)
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post.as_json(methods: :image_url), status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post.as_json(methods: :image_url)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  def latest
    @post = Post.last
    render json: @post.as_json(methods: :image_url)
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :image)
    end
end
