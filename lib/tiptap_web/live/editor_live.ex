defmodule TiptapWeb.EditorLive do
  use TiptapWeb, :live_view

  alias Tiptap.Learnables
  alias Tiptap.Learnables.Article

  @impl true
  def mount(%{"id" => id}, _session, socket) do
    article = Learnables.get_article!(id)

    {:ok, assign(socket, article: article, save_button_text: gettext("Update Article"))}
  end

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, article: %Article{}, save_button_text: gettext("Create Article"))}
  end

  @impl true
  def handle_event(
        "save",
        %{"title" => title, "content" => json},
        %{assigns: %{article: %{id: nil} = article}} = socket
      ) do
    with {:ok, article} <-
           Learnables.create_article(%{title: title, content: Jason.encode!(json)}) do
      {:noreply, redirect(socket, to: Routes.article_path(socket, :index))}
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end

  @impl true
  def handle_event(
        "save",
        %{"title" => title, "content" => json},
        %{assigns: %{article: article}} = socket
      ) do
    with {:ok, article} <-
           Learnables.update_article(article, %{title: title, content: Jason.encode!(json)}) do
      {:noreply, redirect(socket, to: Routes.article_path(socket, :index))}
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
