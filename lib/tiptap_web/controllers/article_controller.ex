defmodule TiptapWeb.ArticleController do
  use TiptapWeb, :controller

  alias Tiptap.Learnables
  alias Tiptap.Learnables.Article

  def index(conn, _params) do
    articles = Learnables.list_articles()
    render(conn, "index.html", articles: articles)
  end

  def show(conn, %{"id" => id}) do
    article = Learnables.get_article!(id)
    render(conn, "show.html", article: article)
  end

  def delete(conn, %{"id" => id}) do
    article = Learnables.get_article!(id)
    {:ok, _article} = Learnables.delete_article(article)

    conn
    |> put_flash(:info, "Article deleted successfully.")
    |> redirect(to: Routes.article_path(conn, :index))
  end
end
