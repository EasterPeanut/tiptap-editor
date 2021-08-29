defmodule Tiptap.LearnablesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Tiptap.Learnables` context.
  """

  @doc """
  Generate an article.
  """
  def article_fixture(attrs \\ %{}) do
    {:ok, article} =
      attrs
      |> Enum.into(%{content: %{}, title: "some title"})
      |> Tiptap.Learnables.create_article()

    article
  end
end
