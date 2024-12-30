defmodule PublicTransportEtlPipeline.Producer do
  use GenStage

  @url "https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=rapid-bus-kl"
  @fetch_interval :timer.seconds(30)

  def start_link(_opts) do
    GenStage.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    schedule_fetch()
    {:producer, :ok}
  end

  def handle_demand(demand, state) when demand > 0 do
    case GTFSRealtimeParser.fetch_and_parse(@url) do
      {:ok, vehicle_positions} ->
        {:noreply, [vehicle_positions], state}

      {:error, reason} ->
        IO.puts("Error : #{reason}")
        {:noreply, [], state}
    end
  end

  def handle_info(:fetch, state) do
    schedule_fetch() # reschedule fetch

    {:noreply, [], state}
  end

  def schedule_fetch do
    Process.send_after(self(), :fetch, @fetch_interval)
  end
end
