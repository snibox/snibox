class Api::V1::LabelsController < Api::BaseController
  include ResponseData

  before_action :set_label, only: [:update]

  def update
    completed = @label.update(label_params)
    render json: entity_save_data(@label, completed)
  end

  private

  def set_label
    @label = Label.find(params[:id])
  end

  def label_params
    params.require(:label).permit(:name)
  end
end
