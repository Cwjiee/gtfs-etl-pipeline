defmodule PublicTransportEtlPipelineTest do
  use ExUnit.Case
  doctest PublicTransportEtlPipeline

  test "greets the world" do
    assert PublicTransportEtlPipeline.hello() == :world
  end
end
