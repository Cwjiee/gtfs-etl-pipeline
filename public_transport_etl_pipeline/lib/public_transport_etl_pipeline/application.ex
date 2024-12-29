defmodule PublicTransportEtlPipeline.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {PublicTransportEtlPipeline.Producer, 0},
      {PublicTransportEtlPipeline.DataTransform, []},
      {PublicTransportEtlPipeline.Consumer, []}
    ]

    opts = [strategy: :one_for_one, name: PublicTransportEtlPipeline.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
