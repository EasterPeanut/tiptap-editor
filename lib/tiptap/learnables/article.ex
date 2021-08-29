defmodule Tiptap.Learnables.Article do
  use Ecto.Schema
  import Ecto.Changeset

  schema "articles" do
    field :title, :string

    field :content, :string,
      default: Jason.encode!(%{type: "doc", content: [%{type: "paragraph"}]})

    timestamps()
  end

  @doc false
  def changeset(article, attrs) do
    article
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
