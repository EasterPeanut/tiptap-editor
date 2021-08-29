defmodule Tiptap.Learnables.Article do
  use Ecto.Schema
  import Ecto.Changeset

  schema "articles" do
    field :title, :string

    field :content_json, :string,
      default: Jason.encode!(%{type: "doc", content: [%{type: "paragraph"}]})

    field :content, :string

    timestamps()
  end

  @doc false
  def changeset(article, attrs) do
    article
    |> cast(attrs, [:title, :content_json, :content])
    |> validate_required([:title, :content_json, :content])
  end
end
