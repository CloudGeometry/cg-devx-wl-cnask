export class PermissionUtils {
  /**
   * @param condition: {"departmentId": "${id}"}
   * @param variables: {"id: 1"}
   * @return condition after parse: {"departmentId": 1}
   */
  public static parseCondition(
    condition: object,
    variables: Record<string, any>
  ): object {
    if (!condition) return null;
    const parsedCondition = {};
    for (const [key, rawValue] of Object.entries(condition)) {
      if (rawValue !== null && typeof rawValue === 'object') {
        const value = this.parseCondition(rawValue, variables);
        parsedCondition[key] = value;
        continue;
      }
      if (typeof rawValue !== 'string') {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}""
      const matches = /\${([a-zA-Z0-9]+)}/.exec(rawValue);
      if (!matches) {
        parsedCondition[key] = rawValue;
        continue;
      }
      const value = variables[matches[1]];
      if (typeof value === 'undefined') {
        throw new ReferenceError(`Variable ${matches[1]} is not defined`);
      }
      parsedCondition[key] = value;
    }
    return parsedCondition;
  }
}
