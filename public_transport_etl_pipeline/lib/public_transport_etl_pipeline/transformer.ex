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
    numbers =
      events
      |> Enum.filter(&Integer.is_even/1)
    {:noreply, numbers, state}
  end
end
