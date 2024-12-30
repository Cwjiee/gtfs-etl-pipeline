defmodule PublicTransportEtlPipeline.Transformer do
  require Integer
  use GenStage

  def start_link(_opts) do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    {:producer_consumer, :ok, subscribe_to: [PublicTransportEtlPipeline.Producer]}
  end

  def handle_events(events, _from, state) do
    transformed_data =
      events
      |> Enum.map(&transform_vehicle/1)
      |> Enum.reject(&is_nil/1)
    {:noreply, transformed_data, state}
  end

  defp transform_vehicle(event) do
    try do
      %{
        vehicle_id: event["vehicle"]["id"],
        status: event["current_status"],
        latitude: event["position"]["latitude"],
        longitude: event["position"]["longitude"],
        speed: event["position"]["speed"],
        trip_id: event["trip"]["trip_id"],
        route_id: event["trip"]["route_id"],
        start_date: event["trip"]["start_date"],
        start_time: event["trip"]["start_time"]
      }
    rescue
      _ -> nil
    end
  end
end
