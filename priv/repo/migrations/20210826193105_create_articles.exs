defmodule Tiptap.Repo.Migrations.CreateArticles do
  use Ecto.Migration

  def change do
    create table(:articles) do
      add :title, :string, null: false
      add :content_json, :jsonb, null: false
      add :content, :varchar, null: false

      timestamps()
    end
  end
end
