class Api::V1::LabelsController < Api::BaseController
  before_action :set_label, only: [:update]

  def update
    data = { completed: false }
    data[:completed] = true if @label.update(label_params)
    render json: data
  end

  private

  def set_label
    @label = Label.find(params[:id])
  end

  def label_params
    params.require(:label).permit(:name)
  end
end
