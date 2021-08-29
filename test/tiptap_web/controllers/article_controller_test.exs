defmodule TiptapWeb.ArticleControllerTest do
  use TiptapWeb.ConnCase

  import Tiptap.LearnablesFixtures

  describe "index" do
    test "lists all articles", %{conn: conn} do
      conn = get(conn, Routes.article_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Articles"
    end
  end

  describe "delete article" do
    setup [:create_article]

    test "deletes chosen article", %{conn: conn, article: article} do
      conn = delete(conn, Routes.article_path(conn, :delete, article))
      assert redirected_to(conn) == Routes.article_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.article_path(conn, :show, article))
      end
    end
  end
end
