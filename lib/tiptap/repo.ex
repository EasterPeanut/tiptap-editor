defmodule Tiptap.Repo do
  use Ecto.Repo,
    otp_app: :tiptap,
    adapter: Ecto.Adapters.Postgres
end
