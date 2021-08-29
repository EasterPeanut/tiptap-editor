defmodule TiptapWeb.Router do
  use TiptapWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {TiptapWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TiptapWeb do
    pipe_through :browser

    get "/", ArticleController, :index

    live "/articles/new", EditorLive, :new
    live "/articles/:id/edit", EditorLive, :edit

    get "/articles/:id", ArticleController, :show
    delete "/articles/:id", ArticleController, :delete
  end

  # Other scopes may use custom stacks.
  # scope "/api", TiptapWeb do
  #   pipe_through :api
  # end
end
