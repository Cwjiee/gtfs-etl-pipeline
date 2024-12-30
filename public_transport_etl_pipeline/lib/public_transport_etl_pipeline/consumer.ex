defmodule PublicTransportEtlPipeline.Consumer do
  require Logger
  use GenStage

  def start_link(_opts) do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:consumer, :ok, subscribe_to: [PublicTransportEtlPipeline.Transformer]}
  end

  def handle_events(events, _from, state) do
    for event <- events do
      Logger.info("Vehicle #{event.vehicle_id} on route #{event.route_id} started from #{event.start_time}" <> 
        "at position: #{event.latitude}, #{event.longitude}")
    end

    {:noreply, [], state}
  end
end
